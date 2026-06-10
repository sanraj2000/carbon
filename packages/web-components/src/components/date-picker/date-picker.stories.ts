/**
 * Copyright IBM Corp. 2019, 2025
 *
 * This source code is licensed under the Apache-2.0 license found in the
 * LICENSE file in the root directory of this source tree.
 */

import { html } from 'lit';
import { prefix } from '../../globals/settings';
import { iconLoader } from '../../globals/internal/icon-loader';
import { INPUT_SIZE } from '../text-input/text-input';
import View16 from '@carbon/icons/es/view/16.js';
import FolderOpen16 from '@carbon/icons/es/folder--open/16.js';
import Folders16 from '@carbon/icons/es/folders/16.js';
import './date-picker';
import './date-picker-input-skeleton';
import '../layer/index';
import '../ai-label';
import { withLayers } from '../../../.storybook/decorators/with-layers';

const sizes = {
  [`Small (${INPUT_SIZE.SMALL})`]: INPUT_SIZE.SMALL,
  [`Medium (${INPUT_SIZE.MEDIUM})`]: INPUT_SIZE.MEDIUM,
  [`Large (${INPUT_SIZE.LARGE})`]: INPUT_SIZE.LARGE,
};

const defaultArgs = {
  dateFormat: 'm/d/Y',
  disabled: false,
  allowInput: true,
  closeOnSelect: true,
  minDate: '',
  maxDate: '',
  readonly: false,
  short: false,
  helperText: 'Use the calendar or type a date in the expected format.',
  invalid: false,
  invalidText: 'Enter a valid date',
  warnText: 'Review the selected date before continuing',
  warn: false,
  placeholder: 'mm/dd/yyyy',
  size: INPUT_SIZE.MEDIUM,
};

type DatePickerArgs = typeof defaultArgs & {
  kind?: 'single' | 'simple' | 'range';
};

const controls = {
  allowInput: {
    control: 'boolean',
    description:
      'Flatpickr prop passthrough enables direct date input, and when set to false, we must clear dates manually by resetting the value prop to empty string making it a controlled input.',
  },
  closeOnSelect: {
    control: 'boolean',
    description:
      'Flatpickr prop passthrough. Controls whether the calendar dropdown closes upon selection.',
  },
  dateFormat: {
    control: 'text',
    description: 'The date format.',
  },
  disabled: { control: 'boolean' },
  helperText: { control: 'text' },
  invalid: {
    control: 'boolean',
    description: 'Specify if the currently value is invalid.',
  },
  invalidText: {
    control: 'text',
    description: 'Message which is displayed if the value is invalid.',
  },
  maxDate: {
    control: 'text',
    description: 'The maximum date that a user can pick to.',
  },
  minDate: {
    control: 'text',
    description: 'The minimum date that a user can start picking from.',
  },
  placeholder: { control: 'text' },
  readonly: {
    control: 'boolean',
    description:
      'Whether the DatePicker is to be readOnly if boolean applies to all inputs if array applies to each input in order.',
  },
  short: {
    control: 'boolean',
    description: '<code>true</code> to use the short version.',
  },
  size: { control: 'select', options: sizes },
  warn: {
    control: 'boolean',
    description: 'Specify whether the control is currently in warning state.',
  },
  warnText: {
    control: 'text',
    description:
      'Provide the text that is displayed when the control is in warning state.',
  },
  onChange: {
    action: `${prefix}-date-picker-changed`,
  },
  onInput: {
    action: 'input',
  },
};

const readonlyKindArgType = {
  kind: {
    table: {
      readonly: true,
    },
  },
};

export const Default = {
  args: { ...defaultArgs, kind: 'single' },
  argTypes: {
    ...controls,
    kind: {
      control: 'radio',
      options: { Single: 'single', Simple: 'simple', Range: 'range' },
      description: `The type of the date picker:
    <ul>
      <li><code>simple</code>
        <ul><li>Without calendar dropdown.</li></ul>
      </li>
      <li><code>single</code>
        <ul><li>With calendar dropdown and single date.</li></ul>
      </li>
      <li><code>range</code>
        <ul><li>With calendar dropdown and a date range.</li></ul>
      </li>
    </ul>`,
    },
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    kind,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="${kind === 'range' ? 'from' : kind}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
        ${kind === 'range'
          ? html`
              <cds-date-picker-input
                kind="to"
                label-text="End date"
                placeholder="${placeholder}"
                size="${size}"
                ?invalid="${invalid}"
                invalid-text="${invalidText}"
                ?warn="${warn}"
                warn-text="${warnText}">
              </cds-date-picker-input>
            `
          : null}
      </cds-date-picker>
    `;
  },
};

export const RangeWithCalendar = {
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
        <cds-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const RangeWithCalendarWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="from"
          label-text="Start date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
        <cds-date-picker-input
          kind="to"
          label-text="End date"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const Simple = {
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        max-date="${maxDate}"
        min-date="${minDate}">
        <cds-date-picker-input
          ?disabled="${disabled}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          ?readonly="${readonly}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SimpleWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        max-date="${maxDate}"
        min-date="${minDate}">
        <cds-date-picker-input
          ?disabled="${disabled}"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          ?readonly="${readonly}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SingleWithCalendar = {
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

export const SingleWithCalendarWithLayer = {
  decorators: [withLayers],
  parameters: {
    layout: 'fullscreen',
  },
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    disabled,
    dateFormat,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

const skeletonControls = {
  hideLabel: {
    control: 'boolean',
    description: 'Specify whether the label should be hidden, or not',
  },
  range: {
    control: 'boolean',
    description: 'Specify whether the skeleton should be of range date picker.',
  },
};

export const Skeleton = {
  args: { hideLabel: false, range: true },
  argTypes: skeletonControls,
  render: ({
    hideLabel,
    range,
  }: {
    hideLabel: boolean;
    range: boolean;
  }) => html`
    <cds-date-picker-input-skeleton
      ?hide-label="${hideLabel}"
      ?range="${range}">
    </cds-date-picker-input-skeleton>
  `,
  decorators: [(_story: () => unknown) => html` <div>${_story()}</div> `],
};

const content = html`
  <div slot="body-text">
    <p class="secondary">AI Explained</p>
    <h2 class="ai-label-heading">84%</h2>
    <p class="secondary bold">Confidence score</p>
    <p class="secondary">
      This suggested delivery date is based on recent order history and current
      warehouse capacity.
    </p>
    <hr />
    <p class="secondary">Model type</p>
    <p class="bold">Foundation model</p>
  </div>
`;

const actions = html`
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(View16 as never, { slot: 'icon' })}
    <span slot="tooltip-content"> View </span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(FolderOpen16 as never, { slot: 'icon' })}
    <span slot="tooltip-content"> Open folder</span>
  </cds-icon-button>
  <cds-icon-button kind="ghost" slot="actions" size="lg">
    ${iconLoader(Folders16 as never, { slot: 'icon' })}
    <span slot="tooltip-content"> Folders </span>
  </cds-icon-button>
  <cds-ai-label-action-button>View details</cds-ai-label-action-button>
`;

export const WithAILabel = {
  args: defaultArgs,
  argTypes: {
    ...controls,
    ...readonlyKindArgType,
  },
  render: ({
    allowInput,
    closeOnSelect,
    dateFormat,
    disabled,
    invalid,
    invalidText,
    maxDate,
    minDate,
    placeholder,
    readonly,
    size,
    warn,
    warnText,
  }: DatePickerArgs) => {
    return html`
      <cds-date-picker
        allow-input="${allowInput}"
        close-on-select="${closeOnSelect}"
        date-format="${dateFormat}"
        ?disabled="${disabled}"
        max-date="${maxDate}"
        min-date="${minDate}"
        ?readonly="${readonly}">
        <cds-date-picker-input
          kind="single"
          label-text="Date Picker label"
          placeholder="${placeholder}"
          size="${size}"
          ?invalid="${invalid}"
          invalid-text="${invalidText}"
          ?warn="${warn}"
          warn-text="${warnText}">
          <cds-ai-label alignment="bottom-left">
            ${content}${actions}</cds-ai-label
          >
        </cds-date-picker-input>
      </cds-date-picker>
    `;
  },
};

const meta = {
  title: 'Components/Date picker',
  parameters: {
    docs: {
      controls: { exclude: ['calendar'] },
    },
  },
};

export default meta;

// Made with Bob
