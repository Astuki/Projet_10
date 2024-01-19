import { render, screen } from "@testing-library/react";
import EventCard from "./index";

describe("When a event card is created", () => {
  it("an image is display with alt value", () => {
    render(
    <EventCard 
      imageSrc="http://src-image" 
      imageAlt="image-alt-text" 
      date={new Date("2022-04-01")}      
      title="test event"
      label="test label"
    />);
    const imageElement = screen.getByTestId("card-image-testid");
    expect(imageElement).toBeInTheDocument();
    expect(imageElement.alt).toEqual("image-alt-text");
  });
  it("a title, a label and a month are displayed", () => {

    const expectedMonth = new Date("2022-04-01").toLocaleDateString(undefined, { month: "long" }); /* Not "hardcoding Avril as the expectedMonth" Part 1/2 */

    render(
      <EventCard
        imageSrc="http://src-image"
        imageAlt="image-alt-text"
        title="test event"
        label="test label"
        date={new Date("2022-04-01")}
      />
    );

    const titleElement = screen.getByText(/test event/);
    const monthElement = screen.getByText(new RegExp(expectedMonth, "i")); /* Not "hardcoding Avril as the expectedMonth" Part 2/2 using expectedMonth */
    const labelElement = screen.getByText(/test label/);

    expect(titleElement).toBeInTheDocument();
    expect(labelElement).toBeInTheDocument();
    expect(monthElement).toBeInTheDocument();
  });
  describe("with small props", () => {
    it("a modifier small is added", () => {
      render(
        <EventCard
          imageSrc="http://src-image"
          imageAlt="image-alt-text"
          title="test event"
          label="test label"
          date={new Date("2022-04-01")}
          small
        />
      );
      const cardElement = screen.getByTestId("card-testid");
      expect(cardElement.className.includes("EventCard--small")).toEqual(true);
    });
  });
});
