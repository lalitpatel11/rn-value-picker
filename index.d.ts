import React from 'react';

interface PickerProps {
  visible: boolean;
  setVisibility: any;
  value?: any;
  setValue: any;
  minValue?: number;
  maxValue?: number;
  unit?: string;
  Title?: string;
  cancelButtonText?: string;
  cancelButtonStyle?: any;
  cancelButtonTextStyle?: any;
  confirmButtonText?: string;
  confirmButtonStyle?: any;
  confirmButtonTextStyle?: any;
  position?: 'bottom' | 'center';
  bgBlur?:
    | '00'
    | '11'
    | '22'
    | '33'
    | '44'
    | '55'
    | '66'
    | '77'
    | '88'
    | '99'
    | 'AA'
    | 'BB'
    | 'CC'
    | 'DD'
    | 'EE'
    | 'FF';
}

declare const ValuePicker: React.FC<PickerProps>;

export default ValuePicker;
