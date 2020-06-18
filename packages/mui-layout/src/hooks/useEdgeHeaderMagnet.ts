import { useState, useRef } from 'react'
import { useLayoutCtx } from '../contexts';
import useScreen from './useScreen';
import useScrollY from './useScrollY';
import useSumHeadersHeight from './useSumHeadersHeight';
import { pickNearestBreakpoint } from '../utils';
import { isCollapsibleSidebarConfig } from '../utils/sidebarChecker';

export const useEdgeHeaderMagnet = (
  sidebarId: string
): { height: string | number } => {
  useScrollY();
  const [counter, setCounter] = useState(0)
  const hiddenRef = useRef(null)
  const screen = useScreen();
  const {
    data: { header, edgeSidebar, subheader },
  } = useLayoutCtx();
  const headerConfig = pickNearestBreakpoint(header, screen);
  const subheaderConfigs = Object.keys(subheader.configMapById)
    .map(subheaderId => {
      return pickNearestBreakpoint(
        subheader.configMapById[subheaderId],
        screen
      );
    })
    .filter(c => !!c && !c.hidden);
  const highestHeight = useSumHeadersHeight(
    [headerConfig, ...subheaderConfigs],
    sidebarId
  );
  if (!highestHeight) return { height: '' } // document is not ready | component is not mounted | height is 0
  if (hiddenRef.current !== subheaderConfigs.length) {
    // need to use setTimeout to let always set height after browser finishes painting
    setTimeout(() => setCounter(counter + 1), 0)
    hiddenRef.current = subheaderConfigs.length
  }

  const sidebarConfig = pickNearestBreakpoint(
    edgeSidebar.configMapById[sidebarId],
    screen
  );
  const shouldHaveHeight =
    isCollapsibleSidebarConfig(sidebarConfig) &&
    sidebarConfig.headerMagnetEnabled;
  return { height: shouldHaveHeight ? highestHeight : '' }; // inline style
};

export default useEdgeHeaderMagnet;
