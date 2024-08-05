interface CardProps {
  title: string;
  value: number;
}

const Card: React.FC<CardProps> = ({ title, value }) => {
  return (
    <div className="rounded bg-theme-light-gray bg-opacity-25 p-4">
      <h2 className="font-sans text-body">{title}</h2>
      <p className="font-sans text-header">{value}</p>
    </div>
  );
};

export default Card;
