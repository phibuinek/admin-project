import Verify from "@/components/auth/verify";

const VerifyPage = ({ params }: { params: { id: string } }) => {
  const { id } = params;
  return (
    <>
      <Verify />
    </>
  );
};

export default VerifyPage;
