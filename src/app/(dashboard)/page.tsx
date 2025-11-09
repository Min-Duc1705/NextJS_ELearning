import { CourseGrid } from "@/components/common";
import CourseItem from "@/components/course/CourseItem";
import Heading from "@/components/typography/Heading";
import createUser from "@/lib/actions/user.actions";
import { create } from "domain";

const page = async () => {
  // const user = await createUser({
  //   clerkId: "clerk_123",
  //   name: "John Doe",
  //   email_address: "john.doe@example.com",
  //   username: "johndoe1",
  // });
  return (
    <div>
      <Heading>Khám phá</Heading>
      <CourseGrid>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
        <CourseItem></CourseItem>
      </CourseGrid>
    </div>
  );
};

export default page;
