import React, { useRef, useState } from "react";
import { fabric } from "fabric";
import { useLocation } from "react-router-dom";

const CanvasEditor = () => {
  const { state } = useLocation();
  const { imageUrl } = state;
  console.log(imageUrl);
  const canvasRef = useRef(null);
  const [canvas, setCanvas] = useState(null);

  // Load image onto canvas when component mounts
  React.useEffect(() => {
    if (canvasRef.current) {
      const newCanvas = new fabric.Canvas(canvasRef.current);
      fabric.Image.fromURL(imageUrl, (img) => {
        newCanvas.setBackgroundImage(img, newCanvas.renderAll.bind(newCanvas));
      });
      setCanvas(newCanvas);
    }
  }, [imageUrl]);

  // Add shape layer on canvas
  const addShape = (type) => {
    if (!canvas) return;

    let shape;
    switch (type) {
      case "circle":
        shape = new fabric.Circle({
          radius: 50,
          fill: "transparent",
          stroke: "red",
          strokeWidth: 2,
          left: 100,
          top: 100,
        });
        break;
      case "triangle":
        shape = new fabric.Triangle({
          width: 100,
          height: 100,
          fill: "transparent",
          stroke: "blue",
          strokeWidth: 2,
          left: 200,
          top: 200,
        });
        break;
      case "rectangle":
        shape = new fabric.Rect({
          width: 100,
          height: 50,
          fill: "transparent",
          stroke: "green",
          strokeWidth: 2,
          left: 300,
          top: 300,
        });
        break;
      case "polygon":
        shape = new fabric.Polygon(
          [
            { x: 100, y: 0 },
            { x: 200, y: 50 },
            { x: 250, y: 150 },
            { x: 150, y: 150 },
            { x: 50, y: 50 },
          ],
          {
            fill: "transparent",
            stroke: "purple",
            strokeWidth: 2,
            left: 400,
            top: 400,
          }
        );
        break;
      default:
        return;
    }
    canvas.add(shape);
  };

  // Add text layer on canvas
  const addText = () => {
    if (!canvas) return;

    const text = new fabric.IText("New Text", {
      fontFamily: "arial black",
      fill: "#333",
      left: 500,
      top: 500,
      fontSize: 20,
      editable: true,
    });
    canvas.add(text);
  };

  // Download the image with all the layers
  const downloadImage = () => {
    if (!canvas) return;

    const dataUrl = canvas.toDataURL({ format: "jpeg", quality: 1 });
    const link = document.createElement("a");
    link.download = "canvas-image.jpeg";
    link.href = dataUrl;
    link.click();
  };

  // Log all the layers in an array format
  const logLayers = () => {
    if (!canvas) return;

    const layers = [];
    canvas.getObjects().forEach((obj) => {
      if (obj.type === "image") {
        layers.unshift("Image");
      } else if (obj.type === "rect") {
        layers.push("Shape");
      } else if (obj.type === "i-text") {
        layers.push("Text");
      }
    });
    console.log(layers);
  };

  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex items-center space-x-4">
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded"
          onClick={() => addShape("triangle")}
        >
          Add Triangle
        </button>
        <button
          className="bg-red-500 text-white px-4 py-2 rounded"
          onClick={() => addShape("circle")}
        >
          Add Circle
        </button>
        <button
          className="bg-green-500 text-white px-4 py-2 rounded"
          onClick={() => addShape("rectangle")}
        >
          Add Rectangle
        </button>
        <button
          className="bg-purple-500 text-white px-4 py-2 rounded"
          onClick={() => addShape("polygon")}
        >
          Add Polygon
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={addText}
        >
          Add Text
        </button>
        <button
          className="bg-yellow-500 text-white px-4 py-2 rounded"
          onClick={downloadImage}
        >
          Download
        </button>
        <button
          className="bg-gray-500 text-white px-4 py-2 rounded"
          onClick={logLayers}
        >
          Log Layers
        </button>
        <canvas className="border w-96 h-96" ref={canvasRef} />
      </div>
    </div>
  );
};

export default CanvasEditor;
