import React, { useEffect, useRef, useState } from "react";
import { fabric } from "fabric";

const CanvasEditor = ({ imageUrl }) => {
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  useEffect(() => {
    const fabricCanvas = new fabric.Canvas("fabricCanvas", {
      width: 800,
      height: 600,
    });
    setCanvas(fabricCanvas);

    fabric.Image.fromURL(imageUrl, (img) => {
      img.set({
        left: 0,
        top: 0,
        selectable: false, 
      });
      fabricCanvas.setBackgroundImage(img, fabricCanvas.renderAll.bind(fabricCanvas));
    });

    return () => fabricCanvas.dispose();
  }, [imageUrl]);

  const addText = () => {
    const text = new fabric.Textbox("Your Caption Here", {
      left: 50,
      top: 50,
      fontSize: 20,
      fill: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.5)",
    });
    canvas.add(text);
  };

  const addShape = (shapeType) => {
    let shape;
    switch (shapeType) {
      case "circle":
        shape = new fabric.Circle({
          radius: 30,
          fill: "red",
          left: 100,
          top: 100,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 60,
          height: 40,
          fill: "blue",
          left: 150,
          top: 150,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 50,
          height: 50,
          fill: "green",
          left: 200,
          top: 200,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 0, y: 0 },
            { x: 50, y: 20 },
            { x: 40, y: 60 },
            { x: 10, y: 60 },
          ],
          {
            left: 250,
            top: 250,
            fill: "purple",
          }
        );
        break;
      default:
        break;
    }
    if (shape) {
      canvas.add(shape);
    }
  };

  const downloadImage = () => {
    canvas.discardActiveObject();
    canvas.renderAll();
    const dataURL = canvas.toDataURL({
      format: "png",
      quality: 1.0,
    });

    const link = document.createElement("a");
    link.href = dataURL;
    link.download = "modified_image.png";
    link.click();
  };

  const logCanvasLayers = () => {
    const objects = canvas.getObjects();
    const layers = objects.map((obj) => obj.toObject());
    console.log(layers);
  };

  return (
    <div>
      <h2>Canvas Editor</h2>
      <div>
        <button onClick={addText}>Add Text</button>
        <button onClick={() => addShape("circle")}>Add Circle</button>
        <button onClick={() => addShape("rectangle")}>Add Rectangle</button>
        <button onClick={() => addShape("triangle")}>Add Triangle</button>
        <button onClick={() => addShape("polygon")}>Add Polygon</button>
        <button onClick={downloadImage}>Download</button>
        <button onClick={logCanvasLayers}>Log Layers</button>
      </div>
      <canvas id="fabricCanvas" ref={canvasRef} style={{ border: "1px solid #ccc" }} />
    </div>
  );
};

export default CanvasEditor;
