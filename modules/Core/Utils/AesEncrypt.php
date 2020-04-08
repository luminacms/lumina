<?php
namespace Modules\Core\Utils;

class AesEncrypt
{
    const AES_IV = "k24v4bovy69nmjjd";  //16位
    const CIPHER = "aes-128-cbc";

    protected static function getKey()
    {
        return substr(csrf_token(), 0, 16);
    }

    /**
     * @param $plain_text
     * @return string
     */
    public static function decrypt($plain_text)
    {
        if (!in_array(self::CIPHER, openssl_get_cipher_methods())){
            abort(500, 'cipher method not support: '.openssl_get_cipher_methods());
        }
        $decrypted = openssl_decrypt(base64_decode($plain_text), self::CIPHER, self::getKey(), OPENSSL_RAW_DATA, self::AES_IV);

        return json_decode($decrypted, true);
    }

    /**
     * @param $plain_text
     * @return string
     */
    public static function encrypt($plain_text)
    {
        if (!in_array(self::CIPHER, openssl_get_cipher_methods())){
            abort(500, 'cipher method not support: '.self::CIPHER);
        }
        $encrypted_data = openssl_encrypt($plain_text, self::CIPHER, self::getKey(), OPENSSL_RAW_DATA, self::AES_IV);

        return base64_encode($encrypted_data);
    }
}
