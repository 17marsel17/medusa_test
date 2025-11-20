import type { MedusaRequest, MedusaResponse } from "@medusajs/framework/http";
import { GetCurrencyConvertDto } from "./validators";
import { CurrencyConverterService } from "../../../../services/currency-converter";

export const GET = async (req: MedusaRequest, res: MedusaResponse) => {
  const query = GetCurrencyConvertDto.parse(req.query);

  const converterService = new CurrencyConverterService();
  const convertedAmount = await converterService.convertCurrency(
    query.amount,
    query.from,
    query.to
  );

  res.json({
    originalAmount: query.amount,
    from: query.from,
    to: query.to,
    convertedAmount,
  });
};
