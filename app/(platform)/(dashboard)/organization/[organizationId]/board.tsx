import { deleteBoard } from "@/actions/delete-board";
import { Button } from "@/components/ui/button";
import { Formdelete } from "./form-delete";

interface BoardProps {
    title: string;
    id: string;
}

export const Board = ({
    title,
    id
}: BoardProps) => {
  const deleteBoardWithId = deleteBoard.bind(null, id);

    return(
        <form action={deleteBoardWithId} className="flex items-center gap-x-2">
          <p>
            Board title: {title}
          </p>
          <Formdelete />
        </form>
    )
}