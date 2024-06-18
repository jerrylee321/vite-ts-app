import { RefCallback, useCallback, useEffect, useRef, useState } from "react";

interface UseScrollIntoViewValues<T extends HTMLElement = HTMLElement> {
  ref: RefCallback<T | null>;
  scroll: () => void;
}

interface UseScrollIntoViewOptions {
  automatic?: boolean;
  scrollOptions?: boolean | ScrollIntoViewOptions;
}

const useScrollIntoView = <T extends HTMLElement = HTMLElement>(
  options: UseScrollIntoViewOptions = {}
): UseScrollIntoViewValues<T> => {
  const { automatic = true, scrollOptions = { behavior: "smooth" } } = options;
  const [shouldScroll, setShouldScroll] = useState(automatic);
  const lastAutomaticRef = useRef(automatic);
  const [targetElement, setTargetElement] = useState<T | null>(null);

  const scroll = useCallback(() => {
    setShouldScroll(true);
  }, []);

  useEffect(() => {
    if (shouldScroll && targetElement) {
      targetElement.scrollIntoView(scrollOptions);
      setShouldScroll(false);
    }
  }, [targetElement, shouldScroll, scrollOptions]);

  useEffect(() => {
    if (automatic && !lastAutomaticRef.current) {
      setShouldScroll(true);
    } else if (!automatic) {
      setShouldScroll(false);
    }
    lastAutomaticRef.current = automatic;
  }, [automatic]);

  return { ref: setTargetElement, scroll };
};

export default useScrollIntoView;
