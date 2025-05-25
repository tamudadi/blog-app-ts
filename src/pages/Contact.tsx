import React, { useState } from 'react';

export const Contact = () => {
  const [name, setName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [nameErrorMessage, setNameErrorMessage] = useState<string>('');
  const [emailErrorMessage, setEmailErrorMessage] = useState<string>('');
  const [messageErrorMessage, setMessageErrorMessage] = useState<string>('');
  const [isSending, setIsSending] = useState<boolean>(false);

  const validateForm = () => {
    let isValid: boolean = true;
    let nameError: string = '';
    let emailError: string = '';
    let messageError: string = '';

    //お名前
    if (!name) {
      nameError = 'お名前を入力してください';
      isValid = false;
    } else if (name.length > 30) {
      nameError = 'お名前は30文字以内で入力してください';
      isValid = false;
    }
    setNameErrorMessage(nameError);
    //email
    if (!email) {
      emailError = 'メールアドレスを入力してください';
      isValid = false;
    } else if (!email.match(/.+@.+\..+/)) {
      emailError = '正しいメールアドレスの形式で入力してください';
      isValid = false;
    }
    setEmailErrorMessage(emailError);
    //message
    if (!message) {
      messageError = '本文を入力してください';
      isValid = false;
    } else if (message.length > 500) {
      messageError = '本文は500文字以内で入力してください';
      isValid = false;
    }
    setMessageErrorMessage(messageError);

    return isValid;
  };
  //フォームの送信
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSending(true);

    const params = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, message }),
    };
    try {
      await fetch(
        'https://1hmfpsvto6.execute-api.ap-northeast-1.amazonaws.com/dev/contacts',
        params
      );
      alert('送信しました');
      handleClear();
    } catch (error) {
      alert(`送信に失敗しました。${error}`);
    } finally {
      setIsSending(false);
    }
  };

  //フォームのクリア
  const handleClear = () => {
    setName('');
    setEmail('');
    setMessage('');
    setNameErrorMessage('');
    setEmailErrorMessage('');
    setMessageErrorMessage('');
  };

  return (
    <div className="p-10 max-w-4xl mx-auto">
      <h1 className="text-xl font-bold mb-10">問い合わせフォーム</h1>
      <form className="gap-6 flex flex-col" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center w-full ">
          <label htmlFor="name" className="w-[240px]">
            お名前
          </label>
          <div className="w-full">
            <input
              className="p-4 border border-gray-300 rounded w-full"
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              disabled={isSending}
            />
            <p className="text-red-700">{nameErrorMessage}</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <label htmlFor="email" className="w-[240px]">
            メールアドレス
          </label>
          <div className="w-full">
            <input
              className="p-4 border border-gray-300 rounded w-full"
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              disabled={isSending}
            />
            <p className="text-red-700">{emailErrorMessage}</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full ">
          <label htmlFor="message" className="w-[240px]">
            本文
          </label>
          <div className="w-full">
            <textarea
              className="p-4 border border-gray-300 rounded w-full"
              rows={8}
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              disabled={isSending}
            />
            <p className="text-red-700">{messageErrorMessage}</p>
          </div>
        </div>
        <div className="flex justify-center gap-4 mt-12">
          <button
            className="rounded-lg bg-gray-800 text-white font-bold py-2 px-4"
            type="submit"
            disabled={isSending}
          >
            送信
          </button>
          <button
            className="rounded-lg bg-gray-300 font-bold py-2 px-4"
            type="button"
            onClick={handleClear}
            disabled={isSending}
          >
            クリア
          </button>
        </div>
      </form>
    </div>
  );
};
