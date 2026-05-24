"use client";

import { createContext, useContext } from "react";
import { ourStory, type OurStoryContent } from "./our-story";

const OurStoryContext = createContext<OurStoryContent>(ourStory);

export function OurStoryProvider({
  data,
  children,
}: {
  data: OurStoryContent;
  children: React.ReactNode;
}) {
  return (
    <OurStoryContext.Provider value={data}>{children}</OurStoryContext.Provider>
  );
}

/** Hook used by Our Story section components to read the active locale's copy. */
export function useOurStory(): OurStoryContent {
  return useContext(OurStoryContext);
}
