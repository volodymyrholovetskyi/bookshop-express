import { HttpClientTimeoutError } from "../../shared/exceptions/httpClientTimoutError";
import { HttpClientError } from "../../shared/exceptions/httpClientError";
import { httpClient } from "../../shared/config";
import log4js from "log4js";

const TIMEOUT_ERROR = "TimeoutError";
const TIMEOUT_DURATION = 2000;

export const featchOrder = async (orderId?: number): Promise<Response> => {

  return await fetch(`${httpClient.url_api}/${orderId}`, {
    signal: AbortSignal.timeout(TIMEOUT_DURATION),
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
