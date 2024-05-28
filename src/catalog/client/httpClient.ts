import { HttpClientTimeoutError } from "../../shared/exceptions/httpClientTimoutError";
import { HttpClientError } from "../../shared/exceptions/httpClientError";
import log4js from "log4js";

const TIMEOUT_ERROR = "TimeoutError";
const TIMEOUT = 2000;
const API_ULR = process.env.API_URL;
 

export const featchOrder = async (orderId?: number): Promise<Response> => {

  return await fetch(`${API_ULR}/${orderId}`, {
    signal: AbortSignal.timeout(TIMEOUT),
    method: "GET",
    headers: {
      "content-type": "application/json;charset=UTF-8",
    },
  })
    .then((result) => result)
    .catch((err) => {
      if (err.name === TIMEOUT_ERROR) {
        log4js.getLogger().error("Timeout occurred while connecting...", err);
        throw new HttpClientTimeoutError(err);
      }
      log4js.getLogger().error("Error occurred while connecting...", err);
      throw new HttpClientError(err);
    });
};
