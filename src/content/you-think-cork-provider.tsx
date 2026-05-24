"use client";

import { createContext, useContext } from "react";
import { youThinkCork, type YouThinkCorkContent } from "./you-think-cork";

const YouThinkCorkContext = createContext<YouThinkCorkContent>(youThinkCork);

export function YouThinkCorkProvider({
  data,
  children,
}: {
  data: YouThinkCorkContent;
  children: React.ReactNode;
}) {
  return (
    <YouThinkCorkContext.Provider value={data}>
      {children}
    </YouThinkCorkContext.Provider>
  );
}

export function useYouThinkCork(): YouThinkCorkContent {
  return useContext(YouThinkCorkContext);
}
