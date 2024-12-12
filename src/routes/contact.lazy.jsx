import { createLazyFileRoute } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import postContact from "../api/postContact";

export const Route = createLazyFileRoute("/contact")({
  component: ContactRoute,
});

function ContactRoute() {
  const mutation = useMutation({
    mutationFn: function (e) {
      e.preventDefault();
      const formData = new FormData(e.target);
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
        <form onSubmit={mutation.mutate}>
          <input name="name" placeholder="name" />
          <input type="email" name="email" placeholder="email@eample.com" />
          <textarea placeholder="Enter Message" name="message"></textarea>
          <button>Submit</button>
        </form>
      )}
    </div>
  );
}
