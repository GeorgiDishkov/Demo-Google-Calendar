interface changeFocusedDateProps {
  nextDate: Date;
}

const useChangeFocusedDate = ({ nextDate }: changeFocusedDateProps) => {
  console.log(nextDate);
};

export default useChangeFocusedDate;
