"use client";
import React from "react";
import {CropsMapProps}  from '@/redux/reducers/cropsMap';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  useDisclosure,
} from "@nextui-org/react";


export default function Model(data : CropsMapProps) {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  return (
    <>
      <Button onPress={onOpen}>View details</Button>
      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        isDismissable={false}
        isKeyboardDismissDisabled={true}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                Farmer Information
              </ModalHeader>
              <ModalBody>
                <div>
                  <p>CropName : {data.cropName}</p>
                  <p>farmerName : {data.farmerName}</p>
                  <p>farmerLocation : {data.farmerLocation}</p>
                  <p>farmerContact : {data.farmerContact}</p>
                  <p>City : {data.city}</p>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="light" onPress={onClose}>
                  Close
                </Button>
                <Button color="success" className="text-xl ml-auto">
                  {data.price}/Kg
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
