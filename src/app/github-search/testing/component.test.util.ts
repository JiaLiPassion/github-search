import { ComponentFixture } from '@angular/core/testing';
import { By } from '@angular/platform-browser';

export function expectElementExistence(fixture: ComponentFixture<any>, selector: string) {
  const elem = fixture.nativeElement.querySelector(selector);
  expect(elem).toBeTruthy();
  return elem;
}

export function expectElementValue(
  fixture: ComponentFixture<any>,
  selector: string,
  value: string
) {
  const elem = expectElementExistence(fixture, selector);
  expect(elem.value).toEqual(value);
}

export function setInputValue(fixture: ComponentFixture<any>, selector: string, value: string) {
  const elem = expectElementExistence(fixture, selector);
  elem.value = value;
}

export function expectElementDisabledStatus(
  fixture: ComponentFixture<any>,
  selector: string,
  isDisabled: boolean
) {
  const elem = expectElementExistence(fixture, selector);
  expect(elem.disabled).toBe(isDisabled);
}

export function expectElementIsDisabled(fixture: ComponentFixture<any>, selector: string) {
  expectElementDisabledStatus(fixture, selector, true);
}

export function expectElementIsNotDisabled(fixture: ComponentFixture<any>, selector: string) {
  expectElementDisabledStatus(fixture, selector, false);
}

export function expectElementContainText(
  fixture: ComponentFixture<any>,
  selector: string,
  text: string
) {
  const elem = expectElementExistence(fixture, selector);
  expect(elem.textContent).toContain(text);
}

export function expectElementMatchUrl(
  fixture: ComponentFixture<any>,
  selector: string,
  url: string
) {
  const elem = expectElementExistence(fixture, selector);
  expect(elem.href).toBe(url);
}

export function clickButton(fixture: ComponentFixture<any>, selector: string) {
  const event = document.createEvent('MouseEvent');
  event.initEvent('click', true, false);
  const elem = expectElementExistence(fixture, selector);
  elem.dispatchEvent(event);
}

export function expectComponentExistence(fixture: ComponentFixture<any>, selector: string) {
  const comp = fixture.debugElement.query(By.css(selector));
  expect(comp).toBeTruthy();
  return comp.componentInstance;
}

export function expectComponentNotExistence(fixture: ComponentFixture<any>, selector: string) {
  const comp = fixture.debugElement.query(By.css(selector));
  expect(comp).toBeFalsy();
}

export function expectComponentInput(
  fixture: ComponentFixture<any>,
  selector: string,
  prop: string,
  expectedResult: any
) {
  const comp = expectComponentExistence(fixture, selector);
  expect(comp[prop]).toBe(expectedResult);
}
