"use client"

import { useEffect, useState } from "react"
import { Modal } from "../ui/modal"
import { Button } from "../ui/button"

interface AlertModalProps {
    isOpen: boolean
    onClose : () => void
    onConfirm : () => void
    loading: boolean
}

export const AlertModal: React.FC<AlertModalProps> = ({isOpen, onClose, onConfirm, loading}) => {
    const [isMounted, setisMounted] = useState(false)

    useEffect(() => {
        setisMounted(true)
    }, [])

    if(!isMounted) {
        return null
    }

    return (
        <Modal
            title="Are you sure to delete this from the store?"
            description="This action cannot be undone"
            isOpen={isOpen}
            onClose={onClose}
        >
            <div className="pt-6 space-x-2 flex items-center justify-end w-full">
                <Button disabled={loading} variant="outline" onClick={onClose}>Cancel</Button>
                <Button disabled={loading} variant="destructive" onClick={onConfirm}>Continue</Button>
            </div>
        </Modal>
    )
}