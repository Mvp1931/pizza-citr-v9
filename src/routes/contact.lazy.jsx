import { prefetchDNS, useFormStatus } from "react-dom";
import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (formData) {
      return postContact(
        formData.get("name"),
        formData.get("email"),
        formData.get("message"),
      );
    },
  });

  return (
    <div className="contact">
      <h2>contact</h2>
      {mutation.isSuccess ? (
        <h3>submitted</h3>
      ) : (
        <form action={mutation.mutate}>
          <ContactInput type="text" name="name" placeholder="name" />
          <ContactInput
            type="email"
            name="email"
            placeholder="email@eample.com"
          />
          <textarea placeholder="Enter Message" name="message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}

function ContactInput() {
  const { pending } = useFormStatus();
  return (
    <input
      disabled={pending}
      name={props.name}
      type={props.type}
      placeholder={props.placeholder}
    ></input>
  );
}
