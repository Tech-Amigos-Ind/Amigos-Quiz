import {
  Select,
  SelectContent,
  SelectItem,
  SelectGroup,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { AnswerTypeEnums } from "../QuestionForm/QuestionForm";

export interface AnswerTypeComponentProps {
  onAnswerTypeOptionSelected: (value: AnswerTypeEnums) => void;
}

export default function AnswerTypeComponent({
  onAnswerTypeOptionSelected,
}: AnswerTypeComponentProps) {
  const onAnswerTypeValueChange = (value: string): void => {
    let answerType: AnswerTypeEnums =
      AnswerTypeEnums[value as keyof typeof AnswerTypeEnums];
    onAnswerTypeOptionSelected(answerType);
  };

  return (
    <div>
      <Select
        defaultValue="MultipleChoiceAnswers"
        onValueChange={onAnswerTypeValueChange}
      >
        <SelectTrigger className="w-[324px]">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectLabel>Options</SelectLabel>
            <SelectItem value="MultipleChoiceAnswers">
              Multiple Choice Answers
            </SelectItem>
            <SelectItem value="SingleAnswer">Single Answer</SelectItem>
            <SelectItem value="BooleanAnswer">True / False Answer</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}