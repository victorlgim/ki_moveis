import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "../data-source";
import { Category} from "../entities";
import { AppError } from "../errors";

  
export const checkDuplicateCategoryName = async (req: Request, res: Response, next: NextFunction) => {

    const categoryName: string = req.body.name;
  
    const categoryRepository = AppDataSource.getRepository(Category);
  
    const existingCategory = await categoryRepository.findOne({
      where: {
        name: categoryName
      },
    });
  
    if (categoryName) {
        if (existingCategory) {
          throw new AppError(`Category already exists`, 409);
        }
    }
  
    next();
  };
  