"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ImagePlus, Trash } from "lucide-react";
import Image from "next/image";

interface ImageUploadProps {
    disabled?: boolean;
    onChange: (value: string) => void;
    onRemove: (value: string) => void;
    value: string[];
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    disabled,
    onChange,
    onRemove,
    value,
}) => {
    const [loading, setLoading] = useState(false);

    const onUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;

        setLoading(true);
        const formData = new FormData();
        formData.append("file", file);

        try {
            const res = await fetch("/api/upload", {
                method: "POST",
                body: formData,
            });

            if (!res.ok) throw new Error("Upload failed");

            const data = await res.json();
            onChange(data.url);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div>
            <div className="mb-4 flex items-center gap-4">
                {value.map((url) => (
                    <div
                        key={url}
                        className="relative w-[200px] h-[200px] rounded-md overflow-hidden"
                    >
                        <div className="z-10 absolute top-2 right-2">
                            <Button
                                type="button"
                                onClick={() => onRemove(url)}
                                variant="destructive"
                                size="icon"
                                disabled={disabled}
                            >
                                <Trash className="h-4 w-4" />
                            </Button>
                        </div>
                        <Image fill className="object-cover" alt="Image" src={url} />
                    </div>
                ))}
            </div>
            <div className="flex items-center gap-4">
                <label>
                    <div className="flex items-center gap-2 border p-2 rounded cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-800 transition">
                        <ImagePlus className="h-4 w-4" />
                        <span>{loading ? "Uploading..." : "Upload Image"}</span>
                    </div>
                    <input
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={onUpload}
                        disabled={disabled || loading}
                    />
                </label>
            </div>
        </div>
    );
};

export default ImageUpload;
