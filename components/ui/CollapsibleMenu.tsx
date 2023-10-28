import * as Collapsible from "@radix-ui/react-collapsible";
import Image from "next/image";
import { useState } from "react";

type CollapsibleType = {
	children: React.ReactNode;
	title: string;
};

export default function CollapsibleMenu({ children, title }: CollapsibleType) {
	const [open, setOpen] = useState<boolean>(false);
	return (
		<Collapsible.Root
			className="w-[300px] border-b border-neutral-300 "
			open={open}
			onOpenChange={setOpen}
		>
			<div className="flex items-center justify-between rounded my-[10px] p-[10px] ">
				<span className="text-neutral-600 text-xs leading-[25px]">
					{title}
				</span>
				<Collapsible.Trigger asChild>
					<button className="h-[20px] w-[20px] text-black inline-flex items-center justify-center focus:shadow-[0_0_0_2px] focus:shadow-black focus:outline-none hover:bg-neutral-200 rounded-full">
						{open ? (
							"▲"
						) : (
							<Image
								width={20}
								height={20}
								className="mt-[2px]"
                                color="black"
								src="/icons/chevron-down.svg"
								alt="Arrow Down"
							/>
						)}
					</button>
				</Collapsible.Trigger>
			</div>
			<Collapsible.Content className="rounded my-[10px] px-[20px] ">
				{children}
			</Collapsible.Content>
		</Collapsible.Root>
	);
}
