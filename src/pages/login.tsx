import Container from "@/components/layouts/Container";
import { Input } from "@/components/ui/input";

const Home = () => {
  return (
    <Container>
      <div className="card">
        <h1>Prisijunkite</h1>
      </div>
      <Input placeholder="El. paštas" />

      <button>Prisijungti</button>
    </Container>
  );
};

export default Home;
