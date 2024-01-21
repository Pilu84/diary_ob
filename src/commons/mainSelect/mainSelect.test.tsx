import React from "react";
import { fireEvent, getByTestId, render, screen, within } from "@testing-library/react";
import { MainSelect } from "./mainSelect";
import { SortByType } from "../../utils/types/types";
import userEvent from "@testing-library/user-event";
import { Utility } from "../../utils/utility";

const options =
Utility.getEnumValuesArray(SortByType).map((enumValue: SortByType) => {
  return [
    enumValue,
    SortByType.asc
  ]
})

describe("Mainselect Test", () => {
  it("should display label", async () => {
    render(<MainSelect
      label={'Sort'}
      name={'select'}
      enumSelect={SortByType}
      handlerChange={(_sortType: string) => {}}
      defaultValue={'desc'}
      labelForItem={'Date'}
    />)

    expect(await screen.findByLabelText('Sort')).toBeInTheDocument();
  })

  it("should display dropdown", async () => {
    render(<MainSelect
      label={'Sort'}
      name={'select'}
      enumSelect={SortByType}
      handlerChange={(_sortType: string) => {}}
      defaultValue={'desc'}
      labelForItem={'Date'}
    />)

    expect(await screen.findByRole('combobox')).toBeInTheDocument();
  })

  it("Changes the selected value", () => {
    render(<MainSelect
      label={'Sort'}
      name={'select'}
      enumSelect={SortByType}
      handlerChange={(_sortType: string) => {}}
      defaultValue={'desc'}
      labelForItem={'Date'}
    />)


      const vatSelectedTextField = screen.getByTestId("select-textField");

      expect(vatSelectedTextField).toBeInTheDocument();


    
  })

})