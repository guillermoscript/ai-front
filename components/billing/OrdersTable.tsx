import {
	Table,
	TableBody,
	TableCaption,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from "@/components/ui/table";
import { Order, Plan, Product } from "@/payload-types";
import { PaginatedDocs } from "@/utils/types";
import Link from "next/link";

export default function OrdersTable({orders}: {orders: PaginatedDocs<Order>;}) {
	return (
		<Table>
			<TableCaption>A list of your recent invoices.</TableCaption>
			<TableHeader>
				<TableRow>
					<TableHead className="w-[100px]">ID</TableHead>
					<TableHead>Status</TableHead>
					<TableHead>Type</TableHead>
					<TableHead>Reference Number</TableHead>
					<TableHead>Product</TableHead>
					<TableHead className="text-right">Amount</TableHead>
				</TableRow>
			</TableHeader>
			<TableBody>
                {orders.docs.map((order) => (
                    <OrderRow key={order.id} order={order} />
                ))}
			</TableBody>
		</Table>
	);
}

function OrderRow({order}: {order: Order}) {
    const { id, status, type, referenceNumber, products, amount } = order;

    const isProductPlan = products?.find((product) => (product as Product).productType);
    const plan = isProductPlan ? (isProductPlan as Product).productType : null;
    const product = plan ? (plan as Plan).name : "N/A";
	

    return (
        <TableRow>
            <TableCell>{id}</TableCell>
            <TableCell>
				{status === 'pending' ? (
					<Link
						href={`/dashboard/billing/orders/${id}`}
						className="text-yellow-500">{status}</Link>
				) : status === 'active' ? (
					<span className="text-green-500">{status}</span>
				) : status === 'canceled' ? (
					<span className="text-red-500">{status}</span>
				) : (
					<span className="text-blue-500">{status}</span>
				)}
			</TableCell>
            <TableCell>{type}</TableCell>
            <TableCell>{referenceNumber ? referenceNumber : "N/A"}</TableCell>
            <TableCell>{product}</TableCell>
            <TableCell className="text-right">{amount}</TableCell>
        </TableRow>
    );
}
