import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
    DialogFooter,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export interface ChannelShopifyStoreDialogProps {
    shopifyStoreDialogOpen: boolean;
    setShopifyStoreDialogOpen: (open: boolean) => void;
    shopifyStoreName: string;
    setShopifyStoreName: (shop: string) => void;
    handleShopifyOauth: () => void;
}

export function ChannelShopifyStoreDialog({
    shopifyStoreDialogOpen,
    setShopifyStoreDialogOpen,
    shopifyStoreName,
    setShopifyStoreName,
    handleShopifyOauth,
}: ChannelShopifyStoreDialogProps) {
    return (
        <Dialog open={shopifyStoreDialogOpen} onOpenChange={setShopifyStoreDialogOpen}>
            <DialogContent
                className="max-w-96 w-[calc(100%-1.25rem)] p-4 rounded-xl"
                overlayClassName="backdrop-blur-sm"
            >
                <DialogHeader className="space-y-1">
                    <DialogTitle className="text-base font-bricolage">
                        Connect Shopify Store
                    </DialogTitle>
                    <DialogDescription className="text-xs">
                        Enter your Shopify store name to connect your store.
                    </DialogDescription>
                </DialogHeader>
                <Input
                    id="shopifyStoreName"
                    placeholder="Shop Name"
                    name="shopifyStoreName"
                    value={shopifyStoreName}
                    onChange={(e) => setShopifyStoreName(e.target.value)}
                    className="bg-secondary text-sm h-full"
                />
                <DialogFooter className="flex items-center justify-end">
                    <Button
                        disabled={shopifyStoreName.length === 0}
                        type="submit"
                        onClick={handleShopifyOauth}
                        className="text-sm "
                    >
                        Proceed
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
