import { useState } from "react";
import { createCategory } from "../services/api";
import { Button, Modal, TextField } from "../vibes";

interface Props {
  isCategoryModalOpen: boolean;
  setIsCategoryModalOpen: (open: boolean) => void;
  onCategoryCreated: (category: { id: number; name: string }) => void;
}

export function CategoryModal({
  isCategoryModalOpen ,
  setIsCategoryModalOpen,
  onCategoryCreated,
}: Props) {

  const [name, setName] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async () => {
    if (!name.trim()) return;

    try {
      setIsSubmitting(true);

      const newCategory = await createCategory(name);

      onCategoryCreated(newCategory);
      setName("");
      setIsCategoryModalOpen(false);
    } catch {
      alert("Failed to create category");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (!isCategoryModalOpen) return null;

  return (
    <Modal
        isOpen={isCategoryModalOpen}
        onClose={() => setIsCategoryModalOpen(false)}
        title="Add New Category"
        >
        <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
        <TextField
          label="Category Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          required
        />
        <Button
            type="button"
            variant="primary"
            onClick={handleSubmit}
            >
            {isSubmitting ? "Creating..." : "Create"}
        </Button>
      </div>
    </Modal>
  );
}