
import React from "react";
import { Dialog, DialogContent, DialogTrigger, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export const AboutModal: React.FC<{ trigger: React.ReactNode }> = ({ trigger }) => (
  <Dialog>
    <DialogTrigger asChild>
      {trigger}
    </DialogTrigger>
    <DialogContent className="max-w-md rounded-2xl">
      <DialogHeader>
        <DialogTitle className="font-balloony text-xl">
          Welcome to Vanessa's Little Art Corner!
        </DialogTitle>
        <DialogDescription>
          <div className="font-semibold text-base my-2">
            🎨 What is this?
          </div>
          <div className="mb-3">
            It's a magical place for kids (and adults!) to imagine something, generate fun black & white "coloring book" images, and paint them your own way!
          </div>
          <div className="font-semibold text-base my-2">
            ⭐ How it works:
          </div>
          <ol className="list-decimal list-inside ml-3 mb-2 space-y-1">
            <li>
              <b>Describe a picture</b> (example: <span className="italic">"A cat riding a bike"</span>).
            </li>
            <li>
              <b>Generate</b> the image, then tap <span className="text-primary">Color This!</span>
            </li>
            <li>
              <b>Choose colors</b> and use the brush or eraser to color your art!
            </li>
            <li>
              <b>Download</b> your masterpiece, or start a new one!
            </li>
          </ol>
          <div className="font-semibold text-base my-2">
            💡 Tips:
          </div>
          <ul className="list-disc list-inside ml-3 space-y-1">
            <li>You can undo/redo your coloring steps.</li>
            <li>Try fun prompts—animals, scenes, anything!</li>
            <li>Works great on tablets and touch screens.</li>
          </ul>
        </DialogDescription>
      </DialogHeader>
      <div className="flex justify-end">
        <Button variant="outline">Got it!</Button>
      </div>
    </DialogContent>
  </Dialog>
);

