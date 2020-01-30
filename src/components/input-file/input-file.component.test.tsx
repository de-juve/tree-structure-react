import React, { Props } from 'react';
import { render } from '@testing-library/react';
import InputFileComponent, { IInputFileComponentProps } from './input-file.component';

describe("<InputFileComponent />", () => {
  test("should display a blank login form, with remember me checked by default", async () => {
    const { findByTestId } = renderInputFileComponent();

    const inputFile = await findByTestId("input-file");

   /* expect(inputFile).toHave({
      username: "",
      password: "",
      remember: true
    });*/
  });
});

/*test('test input file', () => {

})*/
function renderInputFileComponent(props: IInputFileComponentProps = {onChange: () => {}}) {
  const defaultProps: IInputFileComponentProps = {
    onChange() {
      return;
    }
  };
  return render(<InputFileComponent {...defaultProps} {...props} />);
}
