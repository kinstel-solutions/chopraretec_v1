"use client";

import React, { useState } from "react";
import Image from "next/image";
import { homeData } from "@/data/home";
import { Check, Send, X, AlertCircle, Maximize2 } from "lucide-react";

interface CuratorClientProps {
  newImages: string[];
}

export default function CuratorClient({ newImages }: CuratorClientProps) {
  // Aggregate all current images from products snapshot
  const currentImages = Array.from(
    new Set(homeData.products.items.flatMap((item) => item.images || [])),
  );

  // Combine them into a single pool to choose from
  const allAvailableImages = [...currentImages, ...newImages];

  // state: selections[cardId] = array of selected image paths in order
  const [selections, setSelections] = useState<Record<string, string[]>>({});
  const [activeCard, setActiveCard] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [expandedImage, setExpandedImage] = useState<{
    imgPath: string;
    src: string;
  } | null>(null);

  const products = homeData.products.items;

  // Find if an image is used in another card
  const getUsageInfo = (imagePath: string) => {
    for (const [cardId, images] of Object.entries(selections)) {
      if (images.includes(imagePath)) {
        return cardId;
      }
    }
    return null;
  };

  const toggleImageForActiveCard = (imagePath: string) => {
    if (!activeCard) return;

    setSelections((prev) => {
      const currentSelections = prev[activeCard] || [];
      const isAlreadySelected = currentSelections.includes(imagePath);

      let newSelections;
      if (isAlreadySelected) {
        // Remove it
        newSelections = currentSelections.filter((img) => img !== imagePath);
      } else {
        // Add to the end of sequence
        newSelections = [...currentSelections, imagePath];
      }

      return {
        ...prev,
        [activeCard]: newSelections,
      };
    });
  };

  const getSequenceNumber = (imagePath: string, cardId: string) => {
    const cardSelections = selections[cardId] || [];
    const index = cardSelections.indexOf(imagePath);
    return index !== -1 ? index + 1 : null;
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitStatus("idle");

    try {
      const res = await fetch("/api/curator-submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ selections }),
      });

      if (!res.ok) throw new Error("Submission failed");

      setSubmitStatus("success");
    } catch (err) {
      console.error(err);
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const activeCardData = products.find((p) => p.id === activeCard);

  return (
    <div className="min-h-screen bg-neutral-50 p-6 md:p-12 font-sans">
      <div className="max-w-5xl mx-auto">
        <header className="mb-10 text-center">
          <h1 className="text-3xl md:text-5xl font-bold text-slate-800 mb-4 tracking-tight">
            Image Curation Studio
          </h1>
          <p className="text-slate-600 text-lg max-w-2xl mx-auto">
            Select and sequence the best images for each product card below.
            Once you're happy with your choices, click submit to send them
            directly to the development team.
          </p>
        </header>

        {submitStatus === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-2xl p-12 text-center text-green-800 animate-in fade-in zoom-in duration-500">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="w-10 h-10 text-green-600" />
            </div>
            <h2 className="text-3xl font-bold mb-4">
              Selections Sent Successfully!
            </h2>
            <p className="text-lg text-green-700">
              Thank you! The development team has received your choices and will
              update the site shortly.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => {
              const cardSelections = selections[product.id] || [];

              return (
                <div
                  key={product.id}
                  onClick={() => setActiveCard(product.id)}
                  className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 cursor-pointer hover:shadow-md hover:border-blue-300 transition-all group">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-bold text-xl text-slate-800 group-hover:text-blue-600 transition-colors">
                      {product.title}
                    </h3>
                    <div className="bg-slate-100 rounded-full px-3 py-1 text-sm font-medium text-slate-600">
                      {cardSelections.length} Selected
                    </div>
                  </div>

                  <p className="text-sm text-slate-500 mb-6 line-clamp-2">
                    {product.description}
                  </p>

                  {cardSelections.length > 0 ? (
                    <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin scrollbar-thumb-slate-200">
                      {cardSelections.map((img, i) => (
                        <div
                          key={img}
                          className="relative flex-none w-16 h-16 rounded-lg overflow-hidden border-2 border-slate-100">
                          <Image
                            src={
                              img.startsWith("/new-pics") ||
                              img.startsWith("/real-assets") ||
                              img.startsWith("/Ezzy")
                                ? img
                                : `/new-gen-product-images/${img}`
                            }
                            alt="Selection"
                            fill
                            sizes="64px"
                            className="object-cover"
                          />
                          <div className="absolute top-0 left-0 bg-blue-600 text-white text-[10px] sm:text-xs font-bold w-4 h-4 sm:w-5 sm:h-5 flex items-center justify-center rounded-br-lg">
                            {i + 1}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="h-16 flex items-center justify-center border-2 border-dashed border-slate-200 rounded-lg text-sm text-slate-400 group-hover:bg-slate-50 transition-colors">
                      Click to choose images
                    </div>
                  )}

                  <button className="mt-4 w-full py-2 bg-slate-50 hover:bg-slate-100 text-slate-700 font-medium rounded-lg transition-colors border border-slate-200">
                    Edit {cardSelections.length > 0 ? "Selections" : "Images"}
                  </button>
                </div>
              );
            })}
          </div>
        )}

        {/* Submit Button */}
        {submitStatus !== "success" && (
          <div className="mt-12 text-center border-t border-slate-200 pt-8">
            <button
              onClick={handleSubmit}
              disabled={
                isSubmitting ||
                Object.values(selections).every((arr) => arr.length === 0)
              }
              className="inline-flex items-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-full font-bold text-lg hover:bg-blue-700 hover:shadow-lg hover:-translate-y-1 transition-all disabled:opacity-50 disabled:pointer-events-none disabled:transform-none">
              {isSubmitting ? (
                <>Sending...</>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Finish & Send to Developer
                </>
              )}
            </button>
            {submitStatus === "error" && (
              <p className="text-red-500 mt-4 flex justify-center items-center gap-2">
                <AlertCircle className="w-4 h-4" /> Failed to send. Please try
                again or inform the developer.
              </p>
            )}
            <p className="text-slate-400 text-sm mt-4">
              This will email your final selections reliably.
            </p>
          </div>
        )}
      </div>

      {/* Modal Drawer */}
      {activeCard && activeCardData && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="bg-white w-full max-w-6xl h-[90vh] rounded-3xl shadow-2xl flex flex-col overflow-hidden animate-in slide-in-from-bottom-8 duration-300">
            {/* Modal Header */}
            <div className="flex justify-between items-center p-6 border-b border-slate-100 bg-white">
              <div>
                <h2 className="text-2xl font-bold text-slate-800">
                  Selecting for:{" "}
                  <span className="text-blue-600">{activeCardData.title}</span>
                </h2>
                <p className="text-slate-500 mt-1">
                  Click images to select them. The numbers indicate the display
                  sequence.
                </p>
              </div>
              <button
                onClick={() => setActiveCard(null)}
                className="p-3 bg-slate-100 hover:bg-red-50 hover:text-red-500 text-slate-500 rounded-full transition-colors"
                title="Close">
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-6 bg-slate-50 scrollbar-thin scrollbar-thumb-slate-300">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {allAvailableImages.map((imgPath) => {
                  const seqNum = getSequenceNumber(imgPath, activeCard);
                  const isSelectedForThis = seqNum !== null;
                  const usedByOther = !isSelectedForThis
                    ? getUsageInfo(imgPath)
                    : null;

                  // Construct image source
                  const isPublic =
                    imgPath.startsWith("/new-pics") ||
                    imgPath.startsWith("/real-assets") ||
                    imgPath.startsWith("/Ezzy");
                  const src = isPublic
                    ? imgPath
                    : `/new-gen-product-images/${imgPath}`;

                  return (
                    <div
                      key={imgPath}
                      onClick={() =>
                        !usedByOther && toggleImageForActiveCard(imgPath)
                      }
                      className={`
                        relative aspect-square rounded-xl overflow-hidden cursor-pointer transition-all duration-200 group
                        ${usedByOther ? "opacity-40 cursor-not-allowed grayscale-[50%]" : "hover:shadow-md"}
                        ${isSelectedForThis ? "ring-4 ring-blue-500 shadow-lg scale-[0.98]" : "hover:scale-[1.02] bg-slate-200 border border-slate-200"}
                      `}>
                      <Image
                        src={src}
                        alt="Product Option"
                        fill
                        sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
                        className="object-cover"
                      />

                      {/* Expand Button */}
                      {!usedByOther && (
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setExpandedImage({ imgPath, src });
                          }}
                          className="absolute top-2 left-2 bg-black/40 hover:bg-black/70 text-white p-2 rounded-lg backdrop-blur-sm transition-all z-10 opacity-0 group-hover:opacity-100"
                          title="View Full Image">
                          <Maximize2 className="w-4 h-4" />
                        </button>
                      )}

                      {/* Overlay for Used indicator */}
                      {usedByOther && (
                        <div className="absolute inset-0 bg-slate-900/40 flex items-center justify-center p-4">
                          <div className="bg-slate-800/90 text-white text-xs sm:text-sm font-medium px-3 py-2 rounded-lg text-center backdrop-blur-md">
                            Used in <br />
                            <span className="capitalize">
                              {usedByOther.replace(/-/g, " ")}
                            </span>
                          </div>
                        </div>
                      )}

                      {/* Check / Sequence Badge */}
                      {isSelectedForThis && (
                        <div className="absolute bg-blue-500 text-white top-3 right-3 w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm shadow-md ring-2 ring-white animate-in zoom-in duration-200">
                          {seqNum}
                        </div>
                      )}

                      {/* Hover unselected affordance */}
                      {!isSelectedForThis && !usedByOther && (
                        <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-colors flex items-center justify-center">
                          <div className="bg-white text-blue-600 scale-0 group-hover:scale-100 transition-transform shadow-lg w-10 h-10 rounded-full flex items-center justify-center">
                            <span className="text-xl font-bold">+</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Modal Footer */}
            <div className="p-6 border-t border-slate-100 bg-white flex justify-between items-center shadow-[0_-10px_40px_rgba(0,0,0,0.05)]">
              <div className="flex gap-2 p-2 bg-slate-50 rounded-lg items-center">
                <span className="text-sm font-semibold text-slate-500 pl-2">
                  Sequence:
                </span>
                <div className="flex gap-1 overflow-x-auto max-w-[50vw]">
                  {(selections[activeCard] || []).map((img, i) => {
                    const src =
                      img.startsWith("/new-pics") ||
                      img.startsWith("/real-assets") ||
                      img.startsWith("/Ezzy")
                        ? img
                        : `/new-gen-product-images/${img}`;
                    return (
                      <div
                        key={i}
                        className="w-10 h-10 rounded-md overflow-hidden relative border border-slate-200 shrink-0">
                        <img
                          src={src}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                          <span className="text-white text-[10px] font-bold drop-shadow-md">
                            {i + 1}
                          </span>
                        </div>
                      </div>
                    );
                  })}
                  {!(selections[activeCard]?.length > 0) && (
                    <span className="text-sm text-slate-400 italic px-2 py-1">
                      None selected yet
                    </span>
                  )}
                </div>
              </div>
              <button
                onClick={() => setActiveCard(null)}
                className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors shadow-sm">
                Done with {activeCardData.title}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Fullscreen Viewer */}
      {expandedImage && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/95 backdrop-blur-md animate-in fade-in duration-200">
          <button
            onClick={() => setExpandedImage(null)}
            className="absolute top-6 right-6 p-3 bg-white/10 hover:bg-white/20 text-white rounded-full transition-colors z-[70]"
            title="Close">
            <X className="w-6 h-6" />
          </button>

          <div className="relative w-full max-w-6xl max-h-[90vh] flex flex-col items-center">
            <div className="relative w-full h-[75vh]">
              <Image
                src={expandedImage.src}
                alt="Full View"
                fill
                className="object-contain drop-shadow-2xl"
              />
            </div>

            <div className="mt-8 flex gap-4">
              {activeCard && (
                <button
                  onClick={() => {
                    toggleImageForActiveCard(expandedImage.imgPath);
                  }}
                  className={`px-8 py-3 rounded-xl font-bold transition-all shadow-lg ${
                    getSequenceNumber(expandedImage.imgPath, activeCard) !==
                    null
                      ? "bg-red-500 hover:bg-red-600 text-white"
                      : "bg-blue-600 hover:bg-blue-700 text-white"
                  }`}>
                  {getSequenceNumber(expandedImage.imgPath, activeCard) !== null
                    ? "Deselect Image"
                    : `Select for ${activeCardData?.title || "Card"}`}
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
