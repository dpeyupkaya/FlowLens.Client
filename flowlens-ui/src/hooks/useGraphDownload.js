import { useState } from 'react';
import { useReactFlow, getNodesBounds, getViewportForBounds } from '@xyflow/react';
import { toPng, toJpeg, toSvg } from 'html-to-image';

export const useGraphDownload = () => {
  const { getNodes } = useReactFlow();
  const [isDownloading, setIsDownloading] = useState(false);

  const downloadGraph = async (format) => {
    setIsDownloading(true);
    try {
      const nodes = getNodes();
      if (nodes.length === 0) return;

      const nodesBounds = getNodesBounds(nodes);
      
      const imageWidth = nodesBounds.width + 200; 
      const imageHeight = nodesBounds.height + 200;

      const viewport = document.querySelector('.react-flow__viewport');
      if (!viewport) return;

      const transform = getViewportForBounds(
        nodesBounds,
        imageWidth,
        imageHeight,
        0.1, 
        2,   
        0.1  
      );

      const options = {
        backgroundColor: '#020617', 
        width: imageWidth,
        height: imageHeight,
        style: {
          width: imageWidth,
          height: imageHeight,
          transform: `translate(${transform.x}px, ${transform.y}px) scale(${transform.zoom})`,
        },
      };

      let dataUrl;
      let ext = format;
      
      if (format === 'png') dataUrl = await toPng(viewport, options);
      else if (format === 'jpeg') { dataUrl = await toJpeg(viewport, { ...options, quality: 0.95 }); ext = 'jpg'; }
      else if (format === 'svg') dataUrl = await toSvg(viewport, options);


      const a = document.createElement('a');
      a.setAttribute('download', `FlowLens_Architecture.${ext}`);
      a.setAttribute('href', dataUrl);
      a.click();
      
    } catch (error) {
      console.error("Harita indirilirken hata oluştu:", error);
    } finally {
      setIsDownloading(false);
    }
  };

  return { downloadGraph, isDownloading };
};