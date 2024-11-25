import { toast } from "react-toastify";

export const toastPromise = (
  promise,
  { pending, error, success, then = () => {}, catch_ = () => {} }
) => {
  toast.promise(
    new Promise(async (res, rej) => {
      try {
        const result = await promise();
        then(result);
        res();
      } catch (e) {
        console.log(e);
        catch_(e);
        rej();
      }
    }),
    { pending, error, success }
  );
};

export const toastThis = (message, type) => {
  toast[type](message);
};

export const toastErrTemplate = (err)=>{if(err?.response?.data?.message)toastThis(err?.response?.data?.message,"error")}
export const toastErrTemplateErrors = (err)=>{if(err?.response?.data?.errors)
  err?.response?.data?.errors.forEach(element => {
    toastThis(element,"error")
  });
}