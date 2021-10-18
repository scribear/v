import * as React from 'react';
import { useCallback, useMemo } from 'react';
import { ControlStatus, AzureStatus, ApiStatus } from '../../../redux/types';
import * as speechSDK from 'microsoft-cognitiveservices-speech-sdk'
export const GetAzureRecognition = () => {
    const pog = "hi"
    const test = useCallback(
        async (control: ControlStatus, azureStatus: AzureStatus) => new Promise((resolve, reject) => {
            let azureSpeech = speechSDK.SpeechTranslationConfig.fromSubscription(azureStatus.azureKey, azureStatus.azureRegion)
            azureSpeech.speechRecognitionLanguage = control.speechLanguage;
            azureSpeech.addTargetLanguage(control.textLanguage)
            let azureAudioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();
            let reco = new speechSDK.TranslationRecognizer(azureSpeech, azureAudioConfig);
            reco.canceled = () => {
                resolve(false);  
            }
            reco.sessionStarted = () => {
                resolve(true);  
            }
            reco.recognizeOnceAsync();
        }),
        [pog]
    )
    return useMemo(() => ({ pog, test }), [pog]);
};

export const AzureRecognition = () => {
  var transcript=""
  const [azureTranscripts, setTranscripts] = React.useState<string[]>([]);
  const azureListen = useCallback(
    async (transcriptsFull: string, control: React.MutableRefObject<ControlStatus>, azureStatus: React.MutableRefObject<AzureStatus>, currentAPI: React.MutableRefObject<ApiStatus>) =>
      new Promise((resolve, reject) => {
        var lastStartedAt = new Date().getTime();
        let textLanguage = control.current.textLanguage
        let azureSpeech = speechSDK.SpeechTranslationConfig.fromSubscription(azureStatus.current.azureKey, azureStatus.current.azureRegion)
        azureSpeech.speechRecognitionLanguage = control.current.speechLanguage;
        azureSpeech.addTargetLanguage(control.current.textLanguage)
        azureSpeech.setProfanity(2);
        let azureAudioConfig = speechSDK.AudioConfig.fromDefaultMicrophoneInput();
        let speechRecognition = new speechSDK.TranslationRecognizer(azureSpeech, azureAudioConfig);
        let lastRecognized = ""
        speechRecognition.startContinuousRecognitionAsync();
        speechRecognition.recognizing= (s, e) => {

          if (control.current.listening == false || currentAPI.current.currentAPI != 1) {
            speechRecognition.stopContinuousRecognitionAsync()
            resolve(transcriptsFull);   
          } else {
            transcript = lastRecognized + e.result.translations.get(textLanguage);  
            setTranscripts([...azureTranscripts, transcript]);
            transcriptsFull = transcript
          }
        };
        speechRecognition.recognized= (s, e) => {

            if (control.current.listening == false  || currentAPI.current.currentAPI != 1) {
              speechRecognition.stopContinuousRecognitionAsync()
              resolve(transcriptsFull);   
            } else {
            lastRecognized +=  e.result.translations.get(textLanguage) + " ";
            transcript = lastRecognized
            setTranscripts([...azureTranscripts, transcript]);
            transcriptsFull = transcript
            }
          };
          speechRecognition.sessionStopped = (s, e) => {
            var timeSinceStart = new Date().getTime() - lastStartedAt;
            if (control.current.listening == false || currentAPI.current.currentAPI != 1) {
              resolve(transcriptsFull);   
            } else if (timeSinceStart > 1000) {
              speechRecognition.startContinuousRecognitionAsync()
            }
          }
      }),
    [setTranscripts]
  );

  return useMemo(() => ({ azureTranscripts, azureListen }), [azureTranscripts]);
};