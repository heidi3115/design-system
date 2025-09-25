'use client';

import {
  AlertCircleIcon,
  BarChartIcon,
  BookmarkIcon,
  CopyIcon,
  EditIcon,
  FileIcon,
  FileTextIcon,
  GlobeIcon,
  GridIcon,
  IconProps,
  LayersIcon,
  LayoutIcon,
  ListIcon,
  MenuIcon,
  MessageSquareIcon,
  Minimize2Icon,
  MonitorIcon,
  RotateIcon,
  ServerIcon,
  SlidersIcon,
  StarIcon,
  ZoomInIcon,
} from '@common/ui/icons';
import { ComponentType, useMemo } from 'react';

export const useNavIconMapping = (): Record<string, ComponentType<IconProps>> => {
  return useMemo(() => {
    return {
      default: () => <MenuIcon />,
      Detect: () => <Minimize2Icon />,
      Scenario: () => <ServerIcon />,
      AiPlaybook: () => <BookmarkIcon />,
      EventAnalysis: () => <EditIcon />,
      ExplanationMenu: () => <FileIcon />,
      Analysis: () => <SlidersIcon />,
      BigDataSearch: () => <ZoomInIcon />,
      Layer: () => <LayersIcon />,
      LineCircle: () => <BarChartIcon />,
      AiSimilarity: () => <CopyIcon />,
      Dashboard: () => <GridIcon />,
      AllDashboard: () => <LayoutIcon />,
      ResponseManage: () => <AlertCircleIcon />,
      AutoResponse: () => <StarIcon />,
      SystemManage: () => <MonitorIcon />,
      LogManage: () => <ListIcon />,
      Explanation: () => <MessageSquareIcon />,
      Report: () => <FileTextIcon />,
      DetectInfo: () => <GlobeIcon />,
      SettingManage: () => <RotateIcon />,
    };
  }, []);
};
