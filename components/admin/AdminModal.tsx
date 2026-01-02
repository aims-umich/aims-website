"use client";

import React from "react";
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@heroui/react";
import { Trash2 } from "lucide-react";

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  isSaving?: boolean;
  onDelete?: () => void;
  isDeleting?: boolean;
  deleteConfirmMessage?: string;
}

export default function AdminModal({
  isOpen,
  onClose,
  title,
  children,
  onSave,
  isSaving = false,
  onDelete,
  isDeleting = false,
  deleteConfirmMessage = "Are you sure you want to delete this item? This action cannot be undone.",
}: AdminModalProps) {
  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleDelete = () => {
    if (onDelete) {
      onDelete();
      onDeleteClose();
    }
  };

  return (
    <>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        size="3xl"
        scrollBehavior="inside"
        backdrop="opaque"
        classNames={{
          backdrop: "bg-black/60",
          base: "bg-white border border-gray-200 shadow-2xl max-h-[90vh]",
          header: "border-b border-gray-100 bg-gray-50/50",
          body: "bg-white py-6 min-h-[50vh]",
          footer: "border-t border-gray-100 bg-gray-50/50",
        }}
        motionProps={{
          variants: {
            enter: {
              y: 0,
              opacity: 1,
              transition: { duration: 0.2, ease: "easeOut" },
            },
            exit: {
              y: -10,
              opacity: 0,
              transition: { duration: 0.15, ease: "easeIn" },
            },
          },
        }}
      >
        <ModalContent>
          {(onCloseModal) => (
            <>
              <ModalHeader className="flex items-center justify-between px-6 py-4">
                <h2 className="text-xl font-bold text-blue-michigan">
                  {title}
                </h2>
              </ModalHeader>
              <ModalBody className="px-6 overflow-y-auto">
                <div className="space-y-6">{children}</div>
              </ModalBody>
              <ModalFooter className="px-6 py-4 gap-3">
                <div className="flex items-center justify-between w-full">
                  {onDelete ? (
                    <Button
                      color="danger"
                      variant="flat"
                      onPress={onDeleteOpen}
                      className="font-medium text-red-600 hover:text-red-700 hover:bg-red-50"
                      startContent={<Trash2 size={16} />}
                    >
                      Delete
                    </Button>
                  ) : (
                    <div />
                  )}
                  <div className="flex gap-3 ml-auto">
                    <Button
                      variant="flat"
                      onPress={onCloseModal}
                      className="font-medium text-gray-600 hover:text-gray-800"
                    >
                      Cancel
                    </Button>
                    <Button
                      className="bg-blue-michigan text-yellow-maize font-bold px-6 hover:bg-blue-michigan/90 transition-colors"
                      onPress={onSave}
                      isLoading={isSaving}
                    >
                      {isSaving ? "Saving..." : "Save Changes"}
                    </Button>
                  </div>
                </div>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>

      {/* Delete Confirmation Modal */}
      <Modal 
        isOpen={isDeleteOpen} 
        onClose={onDeleteClose} 
        size="md"
        backdrop="blur"
        classNames={{
          wrapper: "z-[100]",
          backdrop: "z-[90]"
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                <h2 className="text-xl font-bold text-red-600">
                  Confirm Delete
                </h2>
              </ModalHeader>
              <ModalBody>
                <p className="text-gray-700">{deleteConfirmMessage}</p>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
                <Button
                  color="danger"
                  onPress={handleDelete}
                  isLoading={isDeleting}
                >
                  {isDeleting ? "Deleting..." : "Delete"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
