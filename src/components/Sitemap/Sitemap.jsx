import React from "react";
import { Link } from "react-router-dom";
import "./Sitemap.css";
import sitemap from "../../json/sitemap.json";
import { FaArrowUpRightFromSquare } from "react-icons/fa6";
function SitemapItem({ __key, value }) {
  return (
    <div className="flex-wrap p-2 my-2 border-4 border-gray-800 border-solid md:p-5 md:my-5 justify-evenly rounded-3xl ms-5 sitemap-links-item d-center">
      <h2 className="">{__key}</h2>
      <div className="flex-wrap w-full text-center md:w-3/4 sitemap-links-sub stack text-nowrap">
        {typeof value === "object" &&
          Object.keys(value).map((subkey, index) => (
            <SitemapItem key={index} __key={subkey} value={value[subkey]} />
          ))}
        {typeof value === "string" && (
          <Link to={value} className="d-center">
            <span className="hidden md:block">{value}</span>
            <FaArrowUpRightFromSquare className="block md:hidden" />
          </Link>
        )}
      </div>
    </div>
  );
}
function Sitemap() {
  return (
    <div className="sitemap">
      <h1>Sitemap</h1>
      <div className="gap-2 sitemap-links vstack">
        {Object.keys(sitemap).map((key) => (
          <div key={key} className="sitemap-links-item stack">
            <SitemapItem __key={key} value={sitemap[key]} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Sitemap;
