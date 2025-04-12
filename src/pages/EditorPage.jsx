import React, { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import {
  Canvas,
  Image as FabricImage,
  IText,
  Rect,
  Circle,
  Triangle,
  Polygon,
} from "fabric";

const EditorPage = () => {
  const canvasRef = useRef(null);
  const fabricCanvasRef = useRef(null);
  const location = useLocation();
  const imgUrl = location.state?.imgUrl;

  useEffect(() => {
    if (!imgUrl) return;

    if (fabricCanvasRef.current) {
      fabricCanvasRef.current.dispose();
    }

    const canvas = new Canvas(canvasRef.current, {
      width: 800,
      height: 500,
    });
    fabricCanvasRef.current = canvas;

    FabricImage.fromURL(imgUrl, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false,
      });
      img.scaleToWidth(800);
      canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas));
    });

    return () => canvas.dispose();
  }, [imgUrl]);

  const addText = () => {
    const canvas = fabricCanvasRef.current;
    const text = new IText("Edit me", {
      left: 50,
      top: 50,
      fontSize: 24,
      fill: "black",
    });
    canvas.add(text);
    canvas.setActiveObject(text);
  };

  const addRectangle = () => {
    const rect = new Rect({
      left: 100,
      top: 100,
      fill: "rgba(255, 0, 0, 0.5)",
      width: 120,
      height: 80,
    });
    fabricCanvasRef.current.add(rect);
  };

  const addCircle = () => {
    const circle = new Circle({
      left: 150,
      top: 150,
      radius: 50,
      fill: "rgba(0, 0, 255, 0.5)",
    });
    fabricCanvasRef.current.add(circle);
  };

  const addTriangle = () => {
    const triangle = new Triangle({
      left: 200,
      top: 200,
      width: 100,
      height: 100,
      fill: "rgba(0, 255, 0, 0.5)",
    });
    fabricCanvasRef.current.add(triangle);
  };

  const addPolygon = () => {
    const polygon = new Polygon(
      [
        { x: 200, y: 100 },
        { x: 250, y: 150 },
        { x: 300, y: 100 },
        { x: 275, y: 50 },
        { x: 225, y: 50 },
      ],
      {
        left: 250,
        top: 100,
        fill: "rgba(255, 255, 0, 0.5)",
      }
    );
    fabricCanvasRef.current.add(polygon);
  };

  const downloadImage = () => {
    const dataURL = fabricCanvasRef.current.toDataURL({ format: "png" });
    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "edited-image.png";
    link.click();
  };

  const logCanvasLayers = () => {
    const canvas = fabricCanvasRef.current;
    if (!canvas) return;

    const layers = canvas.getObjects().map((obj) => {
      const layerInfo = {
        type: obj.type,
        left: obj.left,
        top: obj.top,
        angle: obj.angle,
        scaleX: obj.scaleX,
        scaleY: obj.scaleY,
      };

      if (obj.type === "i-text") {
        layerInfo.text = obj.text;
        layerInfo.fill = obj.fill;
        layerInfo.fontSize = obj.fontSize;
      }

      if (["rect", "circle", "triangle", "polygon"].includes(obj.type)) {
        layerInfo.fill = obj.fill;
        if (obj.width) layerInfo.width = obj.width;
        if (obj.height) layerInfo.height = obj.height;
      }

      if (obj.type === "image") {
        layerInfo.src = obj.getSrc?.();
      }

      return layerInfo;
    });

    console.log("🧠 Canvas Layers:", layers);
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Edit Image</h2>
      <div className="mb-4 flex flex-wrap gap-2">
        <button onClick={addText} className="bg-blue-500 text-white px-3 py-1 rounded">Add Text</button>
        <button onClick={addRectangle} className="bg-green-500 text-white px-3 py-1 rounded">Add Rectangle</button>
        <button onClick={addCircle} className="bg-purple-500 text-white px-3 py-1 rounded">Add Circle</button>
        <button onClick={addTriangle} className="bg-pink-500 text-white px-3 py-1 rounded">Add Triangle</button>
        <button onClick={addPolygon} className="bg-yellow-500 text-black px-3 py-1 rounded">Add Polygon</button>
        <button onClick={downloadImage} className="bg-black text-white px-3 py-1 rounded">Download Image</button>
        <button onClick={logCanvasLayers} className="bg-indigo-600 text-white px-4 py-2 rounded mt-4">🧠 Log Canvas Layers</button>
      </div>
      <canvas ref={canvasRef} />
    </div>
  );
};

export default EditorPage;