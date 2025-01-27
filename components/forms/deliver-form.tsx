"use client";
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import axios from "axios";
import { useState } from "react";
import { toast } from "../ui/use-toast";

export default function DeliverForm({ delivered, id }: { delivered: boolean, id: string }) {
    const [checkedValue, setCheckedValue] = useState(delivered);
    const [isLoading, setIsLoading] = useState(false);

    const onChangeHandler = async (e: string) => {
        const newValue = e === 'Delivered';
        setCheckedValue(newValue);
        setIsLoading(true);
        try {
            const result = await axios.put(`/api/orders/${id}`, { delivered: newValue });
            setIsLoading(false);
            toast({
                description: 'Delivery status updated successfully'
            });
        } catch (error) {
            setIsLoading(false);
            toast({ description: 'Failed to update delivery status' });
            console.error('Error updating delivery status:', error);
        }
    }

    return (
        <div>
            <Select onValueChange={(e) => onChangeHandler(e)} value={checkedValue ? 'Delivered' : 'Not delivered'} disabled={isLoading}>
                <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder={delivered ? "Delivered" : "Not delivered"} />
                </SelectTrigger>
                <SelectContent>
                    <SelectGroup>
                        <SelectItem value="Delivered"> Delivered </SelectItem>
                        <SelectItem value="Not delivered" >Not delivered </SelectItem>
                    </SelectGroup>
                </SelectContent>
            </Select>
            {isLoading && <p> Loading...</p>}
        </div>
    );
}
