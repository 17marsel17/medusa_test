import {
  defineMiddlewares,
  validateAndTransformQuery,
} from "@medusajs/framework/http";
import { GetCurrencyConvertDto } from "./store/custom/currency/convert/validators";

export default defineMiddlewares({
  routes: [
    {
      matcher: "/currency/convert",
      method: "GET",
      middlewares: [validateAndTransformQuery(GetCurrencyConvertDto, {})],
    },
  ],
});
