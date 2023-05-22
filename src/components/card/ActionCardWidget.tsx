import React from 'react';

import ActionCard from 'models/action_card';
import { formatRemaining } from 'utils/format';

import { useGame } from 'hooks/useGame';

import { cardStyles as styles } from 'styles/components/card/card';

type ActionCardWidgetProps = {
  actionCard: ActionCard;
}

const ActionCardWidget: React.FC<ActionCardWidgetProps> = (props) => {
  const { actionCard } = props;
  const { game } = useGame();

  // アクションカードがタップされたときの処理
  const handleTap = () => {
    console.log("ActionCardWidget: handleTap");
    actionCard.activateEffect(game);
  };

  const ratio = actionCard.remainingTime / actionCard.recharge;

  return (
    <>
      <div onClick={handleTap} css={styles.container}>
        <div css={styles.card}>
          <div css={styles.name}>
            {actionCard.name}
          </div>
          <span css={styles.remaining}>
            {formatRemaining(actionCard.remainingTime, actionCard.recharge)}
          </span>
          <div css={styles.gaugeOverlay(ratio)}></div>
        </div>
      </div>
    </>
  );
}

export default ActionCardWidget
