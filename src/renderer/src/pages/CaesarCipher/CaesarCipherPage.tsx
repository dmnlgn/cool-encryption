import React, { useEffect, useState, type ChangeEvent } from "react";
import { useForm, type SubmitHandler } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import classNames from "classnames";
import { schema } from "@/pages/CaesarCipher/formSchema";

import { englishAlphabet, polishAlphabet } from "@/dictionary/alphabet";
import { dictionary } from "@/dictionary/dictionary";

type TAlphabetType = "alpha-pol" | "alpha-eng";

type TCaesarMode = "encrypt" | "decrypt";

interface ICaesarFormState {
  alphabetType: string;
  caesarKey: number;
  caesarTransmition: string;
}

const CaesarCipherPage = () => {
  const [alphabet, setAlphabet] = useState<TAlphabetType>("alpha-eng");
  const [caesarResult, setCaesarResult] = useState<(string | null)[]>([]);
  const [caesarMode, setCaesarMode] = useState<TCaesarMode>("encrypt");
  const [cryptoAlphabet, setCryptoAlphabet] = useState<string[]>([]);

  const {
    register,
    handleSubmit,
    formState: { errors },
    resetField,
  } = useForm<ICaesarFormState>({
    resolver: yupResolver<ICaesarFormState>(schema),
  });

  const onSubmit: SubmitHandler<ICaesarFormState> = (data, event) => {
    event?.preventDefault();
    calculateCaesarCipher(data);
  };

  const handleChangeAlphabet = (event: ChangeEvent<HTMLSelectElement>) => {
    const targetElement = (event.target as HTMLSelectElement)
      ?.value as TAlphabetType;
    setAlphabet(targetElement);
    setCryptoAlphabet([]);
    setCaesarResult([]);
    resetField("caesarKey");
    resetField("caesarTransmition");
  };

  const handleChangeAffineMode = (type: TCaesarMode) => {
    switch (type) {
      case "encrypt": {
        setCaesarMode("encrypt");
        break;
      }
      case "decrypt": {
        setCaesarMode("decrypt");
        break;
      }
    }
    setCryptoAlphabet([]);
    setCaesarResult([]);
  };

  const calculateCaesarCipher = (data: ICaesarFormState) => {
    let currentAlphabet = englishAlphabet;

    if (data.alphabetType === "alpha-pol") {
      currentAlphabet = polishAlphabet;
    }

    const splitTranmitedValue = data.caesarTransmition.split("");
    const encryptedValue = [];

    if (splitTranmitedValue.length) {
      for (let i = 0; i < splitTranmitedValue.length; i++) {
        if (!splitTranmitedValue[i].trim()) {
          encryptedValue.push(" ");
          continue;
        }

        const N = currentAlphabet.findIndex(
          (el) => el.toUpperCase() === splitTranmitedValue[i].toUpperCase()
        );
        const K = data.caesarKey;

        let currentLetterIndex = -1;
        if (caesarMode === "encrypt") {
          currentLetterIndex = (N + K) % currentAlphabet.length;
        } else {
          currentLetterIndex = (N - K) % currentAlphabet.length;
          if (currentLetterIndex < 0) {
            currentLetterIndex = currentAlphabet.length + currentLetterIndex;
          }
        }

        const currentLetter = currentAlphabet[currentLetterIndex];

        let parseCurrentLetter = currentLetter;

        if (splitTranmitedValue[i] === splitTranmitedValue[i].toUpperCase()) {
          parseCurrentLetter = parseCurrentLetter.toUpperCase();
        } else {
          parseCurrentLetter = parseCurrentLetter.toLowerCase();
        }

        encryptedValue.push(parseCurrentLetter);
      }

      setCaesarResult(encryptedValue);

      const cryptoAlphabetArray = [];
      for (let i = 0; i < currentAlphabet.length; i++) {
        const N = i;
        const K = data.caesarKey;

        const currentLetterIndex = (N + K) % currentAlphabet.length;
        const currentLetter = currentAlphabet[currentLetterIndex];

        cryptoAlphabetArray.push(currentLetter);
      }

      setCryptoAlphabet(cryptoAlphabetArray);
    }
  };

  const renderAlphabet = () => {
    switch (alphabet) {
      case "alpha-eng": {
        return (
          <div className="cool-cipher-caesar-alphabet">
            {englishAlphabet.map((el, index) => {
              return (
                <div
                  className="cool-cipher-caesar-alphabet-element"
                  key={index}
                >
                  <div>{el}</div>
                  <div className="cool-cipher-caesar-alphabet-element-index">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
      case "alpha-pol": {
        return (
          <div className="cool-cipher-caesar-alphabet">
            {polishAlphabet.map((el, index) => {
              return (
                <div
                  className="cool-cipher-caesar-alphabet-element"
                  key={index}
                >
                  <div>{el}</div>
                  <div className="cool-cipher-caesar-alphabet-element-index">
                    {index + 1}
                  </div>
                </div>
              );
            })}
          </div>
        );
      }
    }
  };

  const renderResult = () => {
    if (caesarResult.length) {
      const result = caesarResult.join("") ?? "";

      return (
        <div className="cool-cipher-caesar-form cool-form cool-cipher-caesar-result">
          <div className="cool-form-group">
            <label className="cool-form-label">
              {dictionary.caesarCipher.results}
            </label>
            <input readOnly={true} value={result} />
          </div>
        </div>
      );
    }
    return null;
  };

  const caesarLabelText =
    caesarMode === "encrypt"
      ? dictionary.caesarCipher.messageToEncode
      : dictionary.caesarCipher.messageToDecode;

  const caesaButtonSubmitText =
    caesarMode === "encrypt"
      ? dictionary.caesarCipher.encodeMessage
      : dictionary.caesarCipher.decodeMessage;

  const renderResultAlphabet = () => {
    if (!!caesarResult.length && !!cryptoAlphabet.length) {
      if (caesarMode === "decrypt") {
        return (
          <div className="cool-cipher-caesar-form cool-form cool-cipher-caesar-result">
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetBeforeDecode}
              </label>
              <div className="cool-cipher-caesar-alphabet">
                {cryptoAlphabet.map((el, index) => {
                  return (
                    <div
                      className="cool-cipher-caesar-alphabet-element"
                      key={index}
                    >
                      <div>{el}</div>
                      <div className="cool-cipher-caesar-alphabet-element-index">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetAfterDecode}
              </label>
              {renderAlphabet()}
            </div>
          </div>
        );
      }

      return (
        <div className="cool-cipher-caesar-form cool-form cool-cipher-caesar-result">
          <div className="cool-form-group">
            <label className="cool-form-label">
              {dictionary.caesarCipher.alphabetBeforeEncode}
            </label>
            {renderAlphabet()}
          </div>
          {!!cryptoAlphabet.length && (
            <div className="cool-form-group">
              <label className="cool-form-label">
                {dictionary.caesarCipher.alphabetAfterEncode}
              </label>
              <div className="cool-cipher-caesar-alphabet">
                {cryptoAlphabet.map((el, index) => {
                  return (
                    <div
                      className="cool-cipher-caesar-alphabet-element"
                      key={index}
                    >
                      <div>{el}</div>
                      <div className="cool-cipher-caesar-alphabet-element-index">
                        {index + 1}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </div>
      );
    } else {
      return null;
    }
  };

  useEffect(() => {
    setCryptoAlphabet([]);
  }, [caesarMode]);

  return (
    <div className="cool-cipher-caesar">
      <div className="content-wrapper">
        <div className="cool-cipher-caesar-container">
          <div className="cool-cipher-caesar-content">
            <div className="cool-cipher-caesar-type-crypt">
              <button
                className={classNames("cool-btn left", {
                  active: caesarMode === "encrypt",
                })}
                onClick={() => handleChangeAffineMode("encrypt")}
              >
                {dictionary.caesarCipher.modeEncode}
              </button>
              <button
                className={classNames("cool-btn right", {
                  active: caesarMode === "decrypt",
                })}
                onClick={() => handleChangeAffineMode("decrypt")}
              >
                {dictionary.caesarCipher.modeDecode}
              </button>
            </div>
            <h3 className="cool-cipher-caesar-form-title">
              {dictionary.caesarCipher.formTitle}
            </h3>
            <form
              className="cool-cipher-caesar-form cool-form"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.caesarCipher.form.alphabetTypeLabel}
                </label>
                <select
                  {...register("alphabetType")}
                  onChange={handleChangeAlphabet}
                  value={alphabet}
                >
                  <option value="alpha-pol">Alfabet polski</option>
                  <option value="alpha-eng">Alfabet angielski</option>
                </select>
              </div>
              <div className="cool-form-group">
                <label className="cool-form-label">
                  {dictionary.caesarCipher.form.caesarKeyLabel}
                </label>
                <input
                  type="number"
                  {...register("caesarKey")}
                  className={classNames({
                    "is-invalid": errors.caesarKey,
                  })}
                />
                {errors.caesarKey && (
                  <p className="input-error-no-margin">
                    {errors.caesarKey.message}
                  </p>
                )}
              </div>
              <div className="cool-form-group">
                <label className="cool-form-label">{caesarLabelText}</label>
                <input
                  type="text"
                  {...register("caesarTransmition")}
                  className={classNames({
                    "is-invalid": errors.caesarTransmition,
                  })}
                />
                {errors.caesarTransmition && (
                  <p className="input-error-no-margin">
                    {errors.caesarTransmition.message}
                  </p>
                )}
              </div>
              <button type="submit" className="cool-btn">
                {caesaButtonSubmitText}
              </button>
            </form>
            {renderResult()}
            {renderResultAlphabet()}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CaesarCipherPage;
