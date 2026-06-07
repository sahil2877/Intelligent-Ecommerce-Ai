import { useParams } from "react-router-dom";

function ProductDetails() {

  const { id } = useParams();

  return (
    <div className="max-w-7xl mx-auto p-10">

      <h1>
        Product ID:
        {id}
      </h1>

    </div>
  );
}

export default ProductDetails;