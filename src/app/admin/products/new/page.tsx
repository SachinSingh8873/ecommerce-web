import ProductForm from "../_components/product-form"

export default function NewProductPage() {
    return (
        <div className="flex-col">
            <div className="flex-1 space-y-4 p-8 pt-6">
                <h1 className="text-3xl font-bold">Create Product</h1>
                <ProductForm />
            </div>
        </div>
    )
}
