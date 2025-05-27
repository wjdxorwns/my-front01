import { useParams } from "react-router-dom"

export default function Productdetail(){
    const [id]= useParams();

    return(
        <div>
            상품 상세보기
        </div>
    )
}