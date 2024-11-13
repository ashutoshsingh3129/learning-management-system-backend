import { BadRequestException } from "@nestjs/common";
import { createHash } from "crypto";

export const createHashValue = (str: string) => {
    if (!str) {
      throw new BadRequestException();
    }
    return createHash('sha256').update(str).digest('hex');
  };
  