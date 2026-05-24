"use client";

import { createContext, useContext } from "react";
import {
  treasures,
  products,
  type Product,
  type TreasuresContent,
} from "./treasures";

type Ctx = { content: TreasuresContent; products: Product[] };

const TreasuresContext = createContext<Ctx>({ content: treasures, products });

export function TreasuresProvider({
  content,
  products: list,
  children,
}: {
  content: TreasuresContent;
  products: Product[];
  children: React.ReactNode;
}) {
  return (
    <TreasuresContext.Provider value={{ content, products: list }}>
      {children}
    </TreasuresContext.Provider>
  );
}

export function useTreasures(): Ctx {
  return useContext(TreasuresContext);
}
