import React, { useEffect } from 'react';
import { PiTerminal } from 'react-icons/pi';
import { useNavigate } from 'react-router-dom';
import sitemap from "../../json/sitemap.json";
import { levelsDeep } from '../../utils/jsutils';
function splitByCh(args) {
    return args?.split(/[.>-]/);
}
function estimateNextPath(args, json) {
    if (!args) return { all: [], result: json };
    let path = splitByCh(args);
    path = path?.filter((item) => item !== "")?.map(e => e.replace(/['"]+/g, ''));
    let __i = json;
    console.log(path, json);
    let temp;
    let all = [];

    for (let i = 0; ; i++) {
        temp = __i
        let all_keys = Object.keys(__i);
        if (path[i] in all_keys) {
            all[i] = path[i];
            __i = __i[path[i]];
        }
        else {
            let matchingKeys = all_keys.filter(key => key.toLowerCase().includes(path[i]));
            if (matchingKeys.length == 0) {
                __i = undefined;
                break;
            }
            else if (matchingKeys.length == 1) {
                all[i] = matchingKeys[0];
                __i = __i[matchingKeys[0]];
            }
            else {
                //TODO: implement some thing for more than one matching key
                all[i] = matchingKeys[0];
                __i = __i[matchingKeys[0]];
            }
        }
        if (__i === undefined)
            break;
    }
    let result = temp;
    console.log('--->', all, result);
    return { all, result, notFirstMatch: !(all.length > 0) };
}
function extractArgs(command) {
    if (command == null) return "";
    if (command == "") return "";
    if (command?.includes(" "))
        return command?.split(" ")?.slice(1)?.join(" ");
    return "";
}

function RenderAllPossiblePathJson({ json, render, before = [] }) {
    return (
        json &&
        <div className='renderall'>

            {typeof json === "string" && render && <span className=''>{json}</span>}
            {typeof json === "object" &&
                <>
                    {Object.keys(json).map((key) => {
                        return (
                            <div key={key} className='key'>
                                {before != null && before.length > 0 && before.join(">") + ">"}
                                {key}
                                {json[key] && <RenderAllPossiblePathJson json={json[key]} render={typeof json[key] != "string"} before={before + [key]} />}
                            </div>
                        )
                    })}
                </>
            }
        </div>
    )
}

function RecursiveRender({ path, i, match, endPossibility }) {
    if (!path || i >= path.length) return null;
    if (!match || i >= match.length) return null;
    const start = path[i].indexOf(match[i]), end = (start + match[i].length);
    return <div className="w-full items-start d-center stack ">
        {typeof path === "object" &&
            <div className='d-center'>
                {path[i] && <>
                    {path[i].substring(0, start)}
                    <u>{path[i].substring(start, end)}</u>
                    {path[i].substring(end)}
                    {i == (path.length - 1) || ">"}
                </>
                }
                <RecursiveRender path={path} i={i + 1} match={match} endPossibility={endPossibility} />
            </div>
        }
    </div>

}
function Terminal({ menu: { isActive, setIsActive }, state }) {
    const [cmd, setCmd] = React.useState("");
    const [nextPath, setNextPath] = React.useState([]);
    const [args, setArgs] = React.useState("");
    const [endPaths, setEndPaths] = React.useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        if (!cmd  || cmd?.split(" ")[0] !== "menu") {
            setNextPath([]);
            setArgs([]);
            setEndPaths(null);
            return;
        }
        let __args = extractArgs(cmd)
        let { all, result, notFirstMatch } = estimateNextPath(__args, sitemap[state]);
        console.log(all, result, notFirstMatch);
        if (notFirstMatch) {
            setNextPath([]);
            setArgs([]);
            result = levelsDeep(result, 1);
            setEndPaths(result);
        } else {
            setNextPath(all);
            setArgs(splitByCh(__args));
            //limit result to 1 levels deep only
            result = levelsDeep(result, 1);
            setEndPaths(result);
        }
    }, [cmd]);
    const handleSubmit = (e) => {
        e.preventDefault();
        performCommand(cmd);
    }
    window.args = args;
    const fx = {
        "help": () => { },
        "clear": () => { },
        "menu": (args) => {
            if (args.length === 0) {
                setIsActive((prev) => !prev);
                return true;
            }
            else {
                const { all, result } = estimateNextPath(args, sitemap[state]);
                if (typeof result === "string") {
                    navigate(result);
                    return true
                }
            }
            return false;
        }
    }
    const performCommand = (command) => {
        const program = command?.split(" ")?.[0];
        fx[program] && fx[program](extractArgs(command)) && setCmd("");
    }
    return (
        <form onSubmit={handleSubmit} className="flex stack gap-5 w-full">
            <div className="d-center w-full">
                <button type="submit" className='unbtn d-center'>
                    <PiTerminal size={37} />
                </button>
                <input accessKey='t' type="text" value={cmd} onChange={(e) => setCmd(e.target.value)} placeholder="Enter command (T)" className='w-full flex bg-transparent outline-none border-none text-white' />
            </div>
            <div className="recommend stack items-start">
                <div className="w-full text-gray-200">

                    <RecursiveRender path={nextPath} i={0} match={args} endPossibility={endPaths} />
                </div>
                <div className="w-full text-gray-400">

                    <RenderAllPossiblePathJson json={endPaths} before={nextPath} />
                </div>
            </div>
        </form>
    );
}
export default Terminal;