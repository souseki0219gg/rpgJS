import React from 'react';

import ActionCard from 'models/action_card';
import { formatRemaining } from 'utils/format';

import { useGame } from 'hooks/useGame';

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

  return (
    <>
      <div onClick={handleTap}>
        {actionCard.name}
        {formatRemaining(actionCard.remainingTime, actionCard.recharge)}
      </div>
    </>
  );
}

export default ActionCardWidget
