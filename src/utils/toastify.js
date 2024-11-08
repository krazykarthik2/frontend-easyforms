import { toast } from "react-toastify";

export const toastPromise = (
  promise,
  { pending, error, success, then = () => {}, catch_ = () => {} }
) => {
  console.log(promise);
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
